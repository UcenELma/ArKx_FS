const mongoose = require('mongoose');

// Connect to your MongoDB database
mongoose
    .connect("mongodb://localhost:27017/mydbusers")
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log("Error: ", error));

// Create User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Create a New User
async function createNewUser() {
    try {
        const newUser = await User.create({
            name: "Mike Ross",
            email: "mike.ross@arkx.group",
            age: 30
        });
        console.log('New user created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Fetch Users with Pagination
async function fetchUsers(page, pageSize) {
    try {
        const users = await User.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        console.log('Users:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Fetch a Single User by Name
async function fetchUserByName(name) {
    try {
        const user = await User.findOne({ name });
        console.log('User by name:', user);
    } catch (error) {
        console.error('Error fetching user by name:', error);
    }
}

// Fetch a Single User by Email
async function fetchUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        console.log('User by email:', user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
    }
}

// Update User Email
async function updateEmailByName(name, newEmail) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { name },
            { $set: { email: newEmail } },
            { new: true }
        );
        if (updatedUser) {
            console.log('Updated user:', updatedUser);
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error updating user email:', error);
    }
}

// Delete Users Created Before a Certain Date
// Delete User After 10 Seconds
async function deleteUserAfterDelay(name, delayInSeconds) {
    setTimeout(async () => {
        try {
            const deletedUser = await User.findOneAndDelete({ name });
            if (deletedUser) {
                console.log('Deleted user after 10 seconds:', deletedUser);
            } else {
                console.log('User not found');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }, delayInSeconds * 1000); // Convert seconds to milliseconds
}

// Example Usage
(async () => {
    // await createNewUser();
    // await fetchUsers(1, 5);
    // await fetchUserByName("Mike Ross");
    // await fetchUserByEmail("mike.ross@arkx.group");
    // await updateEmailByName("Mike Ross", "mike.ross.updated@arkx.group");

    // Delete user after 10 seconds
    await deleteUserAfterDelay("Mike Ross", 10)

    // Close the connection to the database (assuming you have set up a connection)
    mongoose.connection.close();
})();
