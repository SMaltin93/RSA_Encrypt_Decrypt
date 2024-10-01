async function decryptMessage() {
    const encryptedMessage = document.getElementById('messageToDecrypt').value;
    const privateKey = document.getElementById('privateKey').value;

    if (!encryptedMessage || !privateKey) {
        alert("Please enter both an encrypted message and a private key.");
        return;
    }

    // Import the private key
    let key;
    try {
        key = await crypto.subtle.importKey(
            "pkcs8",
            str2ab(atob(privateKey)),
            {
                name: "RSA-OAEP",
                hash: { name: "SHA-256" }
            },
            true,
            ["decrypt"]
        );
    } catch (err) {
        alert("Invalid private key format. Please check and try again.");
        return;
    }

    // Decrypt the message
    try {
        const decrypted = await crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            key,
            str2ab(atob(encryptedMessage))
        );

        document.getElementById('decryptedMessage').value = new TextDecoder().decode(decrypted);
    } catch (err) {
        alert("Decryption failed. Please check the encrypted message and the private key.");
    }
}
