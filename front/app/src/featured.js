/*
  remember these are NOT hats. as soon as they are published,
  we should give them a correct HatID,
  but always pull actual data from web3
*/

const featured = [
    {
        image: require("./assets/rdai.svg"),
        title: "rToken DEV fund",
        shortTitle: "rDAI devs",
        description:
            "The rToken dev fund was created to build and maintain the rToken protocol into the future of DeFi.",
        address: "0x08550C75707DA817c68F7e31A9659f0B3963f991",
        color: "#F7997C"
    },
    {
        image: require("./assets/ethhub.png"),
        title: "EthHub.io donation",
        shortTitle: "EthHub",
        description:
            "EthHub.io is an invaluable resource for all things ethereum",
        address: "0xA19FCDaD77C1F0fd184689aca88BabCF68010347",
        color: "#0a0036",
        hatID: 2
    },
    {
        image: require("./assets/giveth.png"),
        title: "Giveth DAC",
        shortTitle: "Giveth",
        description:
            "Giveth is an open source platform for charitable donations.",
        address: "0x8f951903c9360345b4e1b536c7f5ae8f88a64e79",
        color: "#2f0340"
    },
    {
        image: require("./assets/building.jpg"),
        title: "rDAI is for buidlers!",
        shortTitle: "custom",
        description:
            "Set a custom beneficiary and give the interest to anyone you want!",
        address: "0x0",
        hatID: 0
    },
    {
        image: require("./assets/BFVI.jpg"),
        title: "Bitcoin For Venezuela Initiative",
        shortTitle: "Bitcoin Venezuela",
        description:
            "Bitcoin for Venezuela Initiative is a non profit project bringing food and medicines to Venezuela",
        address: "0x5f48465bb9a29a3904a8d320146e78640df0e96e",
        color: "#f79430"
    },
    {
        image: require("./assets/ethberlinzwei.svg"),
        title: "ETHBerlinZwei Hackers Fund",
        shortTitle: "EthBerlin",
        description:
            "All funds are sent to ETHBerlin to fund Scholarships for the EthBerlinZwei hackathon.",
        address: "0x82338B1b27cfC0C27D79c3738B748f951Ab1a7A0",
        color: "#ffd200"
    }
];
export default featured;