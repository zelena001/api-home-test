export default {
  transfer: {
    success: {
      amount: 100.0,
      sendingAccount: "1234567890",
      receivingAccount: "0123456789",
      receivingBankCode: "123",
    },
    noAmount: {
      sendingAccount: "1234567890",
      receivingAccount: "0123456789",
      receivingBankCode: "123",
    },
    minimumAmount: {
      amount: 0.0,
      sendingAccount: "1111111111",
      receivingAccount: "0123456789",
      receivingBankCode: "123",
    },
  },
  framework: {
    success: {
      title: "foo",
      body: "bar",
      userId: 1,
    },
  },
};
