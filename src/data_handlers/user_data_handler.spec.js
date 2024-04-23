// Mock the axios library
jest.mock('axios');

// Define the imports
const UserDataHandler = require('./user_data_handler');
const axios = require('axios').default

const mockedUserList = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618'
      }
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  }
]

describe('UserDataHandler', () => {
  let userDataHandler;

  beforeEach(() => {
    userDataHandler = new UserDataHandler()
  });

  it('should be created', () => {
    expect(userDataHandler).toBeDefined();
  });

  it('should have an empty user list once created', () => {
    expect(userDataHandler.users).toEqual([]);
  });

  it('should load the list of users', async () => {
    // Arrange
    axios.get.mockResolvedValueOnce({ data: mockedUserList });

    // Act
    await userDataHandler.loadUsers();

    // Assert
    expect(userDataHandler.users).toMatchSnapshot();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');
  });

  it('should fail while loading the list of users', () => {
    // Arrange
    axios.get.mockRejectedValueOnce(new Error({ data: { status: 500 } }));

    // Act
    userDataHandler.loadUsers().catch(err => {
      expect(err).toMatchSnapshot();
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');
      expect(userDataHandler.users).toEqual([]);
    });
  });

  it('should have the users emails', async () => {
    // Arrange
    axios.get.mockResolvedValueOnce({ data: mockedUserList });
    await userDataHandler.loadUsers();

    // Act
    const userEmails = userDataHandler.getUserEmailsList();

    // Assert
    expect(userEmails).toMatchSnapshot();
  });

  it('getUserEmailsList should throw the error in case of empty users', () => {
    try {
      userDataHandler.getUserEmailsList();
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  //9 more tests for full coverage
})
