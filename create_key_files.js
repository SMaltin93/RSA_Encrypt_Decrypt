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
    const publicKey = document.getElementById('publicKeyGenerated').value;
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
    download(privateKey, 'private_key.pem', 'application/octet-stream');
}

// download both keys
function downloadKeys() {
    downloadPublicKey();
    downloadPrivateKey();
}
