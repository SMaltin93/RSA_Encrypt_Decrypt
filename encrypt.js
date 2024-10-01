async function generateKeys() {
    // Generate a new RSA key pair
    const keyPair = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]), // 65537
            hash: "SHA-256"
        },
        true, // Whether the key is extractable
        ["encrypt", "decrypt"] // Usages
    );

    // Export the public key
    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    // Convert keys to base64
    const publicKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(publicKey)));
    const privateKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(privateKey)));

    // Display the generated keys
    document.getElementById('publicKeyGenerated').value = publicKeyBase64;
    document.getElementById('privateKeyGenerated').value = privateKeyBase64;
}

async function encryptMessage() {
    const message = document.getElementById('messageToEncrypt').value;
    const publicKey = document.getElementById('publicKey').value;

    if (!message || !publicKey) {
        alert("Please enter both a message and a public key.");
        return;
    }

    // Import the public key
    const key = await crypto.subtle.importKey(
        "spki",
        str2ab(atob(publicKey)),
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" }
        },
        true,
        ["encrypt"]
    );

    // Encrypt the message
    const encrypted = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        key,
        new TextEncoder().encode(message)
    );

    // Convert ArrayBuffer to base64 for display
    document.getElementById('encryptedMessage').value = btoa(ab2str(encrypted));
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

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}
