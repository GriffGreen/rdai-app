<template>
  <div class="pb-5">
    <v-layout align-center wrap py-5 fluid fill-height pa-0>
      <v-flex text-center mt-4 xs12>
        <h3>Lookup interest</h3>
        <p>Find out if an address has accrued any interest</p>
      </v-flex>
      <v-flex sm8 shrink mx-auto text-xs-center>
        <v-text-field
          v-model="beneficiary"
          label="Beneficiary"
          single-line
          :counter="42"
          :disabled="disableInput"
        >
          <template slot="append">
            <div
              v-if="beneficiary.length === 0 && hasWeb3"
              class="pointer align-center mt-1 mr-3 grey--text"
              @click="beneficiary = userAddress"
            >
              {{ userAddress | formatAddress }}
            </div>
          </template>
        </v-text-field>
      </v-flex>
      <v-flex
        v-if="totalAvailable === 0 && noInterest"
        xs12
        mb-4
        text-center
        shrink
      >
        <span v-if="receivedLoanOf > 0"
          >You have some interest, but not sure how much.</span
        >
        <span v-else>You haven't accrued any interest</span>
      </v-flex>
      <v-flex v-else-if="totalAvailable === 0" xs12 mb-4 text-center shrink>
        <web3-btn
          color="primary"
          outlined
          :disabled="beneficiary.length !== 42"
          action="interestPayableOf"
          :params="{ address: beneficiary }"
          @btn-clicked="interestPayableOfClicked"
          @then="interestPayableOfThen"
          @catch="interestPayableOfCatch"
        >
          Lookup Interest
        </web3-btn>
      </v-flex>
      <v-flex v-else xs12 mb-4 text-center shrink>
        There are <strong>{{ totalAvailable }}</strong> rDAI to withdraw
      </v-flex>
      <v-flex v-if="receivedLoanOf > 0" xs12 mb-4 text-center shrink>
        There are currently <strong>{{ receivedLoanOf }}</strong> DAI underlying
      </v-flex>
      <v-flex xs12 mx-xs-auto text-center>
        <span class="caption"
          >rDAI is transferred to the beneficiary address</span
        >
      </v-flex>
      <v-flex xs12 mx-xs-auto text-center>
        <span class="caption">Anyone can execute the withdrawal for you</span>
      </v-flex>
      <v-flex xs12 mx-xs-auto text-center>
        <web3-btn
          action="payInterest"
          :params="{ address: beneficiary }"
          color="primary"
          :disabled="receivedLoanOf <= 0 && totalAvailable <= 0"
          symbol-append="rdai"
          @then="payInterestThen"
        >
          Withdraw interest
        </web3-btn>
      </v-flex>
      <v-flex v-if="justWithdrew > 0">
        <span class="caption"
          >SUCCESS! {{ justWithdrew }} rDAI withdrawn to
          {{ withdrawn[0] | formatAddress }}</span
        >
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="css" scoped>
.pointer {
  cursor: pointer;
}
</style>

<script>
import Vue from "vue";
import vuex from "vuex";
import { mapState, mapGetters } from "vuex";

export default {
  name: "LookupInterest",
  data: () => ({
    //amount: 0,
    totalAvailable: 0,
    beneficiary: "",
    found: false,
    loading: false,
    noInterest: false,
    withdrawn: [],
    justWithdrew: 0,
    receivedLoanOf: 0,
    disableInput: false
  }),
  computed: {
    ...mapGetters(["userAddress", "hasWeb3"]),
    formattedAmount() {
      var a = parseFloat(this.amount);
      if (a % 1 >= 0 && a % 1 < 0.0001) return a.toFixed(2);
      else return a;
    }
  },
  watch: {
    beneficiary(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.noInterest = false;
        this.totalAvailable = 0;
        this.receivedLoanOf = 0;
      }
    }
  },
  methods: {
    async interestPayableOfClicked() {
      this.disableInput = true;
      this.receivedLoanOf = await this.$store.dispatch(
        "receivedLoanOf",
        this.beneficiary
      );
      this.disableInput = false;
    },
    interestPayableOfThen(value) {
      this.totalAvailable = value;
      this.noInterest = false;
      this.disableInput = false;
    },
    interestPayableOfCatch(value) {
      this.totalAvailable = value;
      this.noInterest = true;
    },
    payInterestThen() {
      this.withdrawn.unshift(this.beneficiary);
      this.justWithdrew = this.totalAvailable;
      this.totalAvailable = 0;
    },
    receivedLoanOfThen(value) {
      this.receivedLoanOf = value;
    }
  }
};
</script>
