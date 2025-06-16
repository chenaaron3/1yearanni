import dessert from './dessert.png';
import disneyland from './disneyland.jpg';
import flowers from './flowers.jpg';
import kbbq from './kbbq.jpg';
import tipples from './mr-tipples.jpg';
import sushi from './sushi.jpg';

export type Question = {
  prompt: string;
  options: string[];
  answer: string;
  letter: string;
  image: string;
};

export const questions: Question[] = [
  {
    prompt: "Where was our favorite jazz bar in SF?",
    options: ["Cafe Réveille", "The Mill", "Mr Tipples", "Boba Guys"],
    answer: "Mr Tipples",
    letter: "M",
    image: tipples,
  },
  {
    prompt: "Where did we do the rope drop?",
    options: [
      "Universal Studios",
      "Six Flags",
      "Disneyland",
      "Golden Gate Park",
    ],
    answer: "Disneyland",
    letter: "Y",
    image: disneyland,
  },
  {
    prompt: "What's our most used nickname for each other?",
    options: ["Honey", "Sweetie", "Babi", "Pumpkin"],
    answer: "Babi",
    letter: "B",
    image: flowers,
  },
  {
    prompt: "What was our favorite dessert to make at home?",
    options: ["Mango Sago", "Brownies", "Tiramisu", "Banana Bread"],
    answer: "Mango Sago",
    letter: "A",
    image: dessert,
  },
  {
    prompt: "What does babi like to eat?",
    options: ["Pizza", "Pho", "Hotpot", "Korean BBQ"],
    answer: "Korean BBQ",
    letter: "B",
    image: kbbq,
  },
  {
    prompt: "What's the most expensive meal we've had together?",
    options: ["Burgers", "Sushi", "Ramen", "Steak"],
    answer: "Sushi",
    letter: "U",
    image: sushi,
  },
];
