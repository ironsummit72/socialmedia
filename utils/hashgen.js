import crypto from 'crypto';

// Function to generate a hash and salt for a given password
const generateHash = (password) => {
	const salt = crypto.randomBytes(16).toString('hex') // Generate a random salt
	const hash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512') // Hash the password using PBKDF2
		.toString('hex')

	return { salt, hash }
}

// Function to verify a password against a stored hash and salt
const verifyPassword = (password, storedHash, storedSalt) => {
	const hash = crypto
		.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha512') // Hash the input password with stored salt
		.toString('hex')

	return hash === storedHash
}
export { generateHash, verifyPassword }
