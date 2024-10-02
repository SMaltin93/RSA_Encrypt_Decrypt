async function decryptMessage() {
    const encryptedMessage = document.getElementById('messageToDecrypt').value;
    const privateKey = document.getElementById('privateKey').value;

    if (!encryptedMessage || !privateKey) {
        alert("Please enter both an encrypted message and a private key.");
        return;
    }

    // Import the private key
    const key = await crypto.subtle.importKey(
        "pkcs8",
        str2ab(atob(privateKey)),
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" }
        },
        true,
        ["decrypt"]
    );
    

    // Decrypt the message
    try {
        const decrypted = await crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            key,
            str2ab(atob(encryptedMessage))
        );
        document.getElementById('decryptedMessage').value = new TextDecoder().decode(decrypted);
    } catch (err) {
        alert("Please enter both an encrypted message and a private key.");
    }

}

// Utility functions to convert between strings and ArrayBuffers
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
// clean when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('messageToDecrypt').value = '';
    document.getElementById('privateKey').value = '';
    document.getElementById('decryptedMessage').value = '';
});

// clear the keys when the page is clicked
// Function to clear the keys
function clearDecryptedMessage() {
    document.getElementById('messageToDecrypt').value = '';
    document.getElementById('privateKey').value = '';
    document.getElementById('decryptedMessage').value = '';
}
