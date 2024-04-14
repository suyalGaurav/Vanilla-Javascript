const accounts = [{
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  
    movementsDates: [
      '2022-11-18T21:31:17.178Z',
      '2022-12-23T07:42:02.383Z',
      '2023-01-28T09:15:04.904Z',
      '2023-01-01T10:17:24.185Z',
      '2024-02-08T14:11:59.604Z',
      '2024-04-05T17:01:17.194Z',
      '2024-04-10T23:36:17.929Z',
      '2024-04-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
  }, {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  
    movementsDates: [
      '2023-11-01T13:15:33.035Z',
      '2023-11-30T09:48:16.867Z',
      '2023-12-25T06:04:23.907Z',
      '2024-01-25T14:18:46.235Z',
      '2024-02-05T16:33:06.386Z',
      '2024-03-10T14:43:26.374Z',
      '2024-03-25T18:49:59.371Z',
      '2024-04-06T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  }
];

const createUserNames = function (accs) {
    accs.forEach(account => {
      const abbreviatedNameArray = account.owner.split(' ');
      const abbreviatedName = abbreviatedNameArray
        .map(owner => owner[0].toLowerCase())
        .join('');
      account.username = abbreviatedName;
    });
  };
  createUserNames(accounts);

export default accounts;