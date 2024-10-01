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
