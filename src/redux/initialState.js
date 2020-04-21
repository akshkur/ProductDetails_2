const initialState = {
  showProducts: [
    {
      id: 1,
      productName: "Refrigrator",
      image: "",
      desc: "Samsung Brand at Rs.14000",
      likes: 2,
      likedByMe: true,
      comments: [
        {
          author: "Matt",
          text: "Nice Product",
        },
        {
          author: "Amit",
          text: "Good Product",
        },
        {
          author: "Jason",
          text: "Durable Product ,liked it",
        },
        {
          author: "Philips",
          text: "Not so useful product",
        },
        {
          author: "Roy",
          text: "would recommend this product",
        },
        {
          author: "Michael",
          text: "would recommend this product",
        },
        {
          author: "Ricky",
          text: "would recommend this product",
        },
      ],
      date: "21-Apr-2020",
    },
    {
      id: 2,
      productName: "Trimmer",
      image: "",
      desc: "Philips Trimmer,Price is:Rs.1200",
      likes: 2,
      likedByMe: true,
      comments: [
        {
          author: "Martin",
          text: "would recommend this product",
        },
      ],
      date: "21-Apr-2020",
    },
    {
      id: 3,
      productName: "Microwave ",
      image: "",
      desc: "Hitachi, Price is Rs.4000",
      likes: 2,
      likedByMe: false,
      comments: [
        {
          author: "Lewis",
          text: "worth price",
        },
      ],
      date: "21-Apr-2020",
    },
  ],
  loading: false,
  errorMessage: "",
};

export default initialState;
