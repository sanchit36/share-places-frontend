import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "John",
      image: "https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
