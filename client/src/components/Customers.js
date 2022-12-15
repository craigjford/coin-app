

const Customer = ({ user }) => {
    console.log('in Customer - user = ')
    if (user) {
      return <h1>Welcome, {user.username}!</h1>;
    } else {
      return <h1>Please Login or Sign Up As We Are Under Construction - Customer Page</h1>; 
    }
}

export default Customer;