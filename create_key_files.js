// download keys as files

function download(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadPublicKey() {
    const publicKey = `-----BEGIN PUBLIC KEY-----\n${document.getElementById('publicKeyGenerated').value}\n-----END PUBLIC KEY-----`;
    if (!publicKey) {
        alert("Please generate a public key first.");
        return;
    }
    download(publicKey, 'public_key.pem', 'application/octet-stream');
}

function downloadPrivateKey() {
    const privateKey = document.getElementById('privateKeyGenerated').value;
    if (!privateKey) {
        alert("Please generate a private key first.");
        return;
    }
    privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
    download(privateKey, 'private_key.pem', 'application/octet-stream');
}

// download both keys
function downloadKeys() {
    downloadPublicKey();
    downloadPrivateKey();
}
