
async function converter(){
    const [file] = "https://imgtr.ee/images/2023/07/27/b4b276c9c301a1fac3372c61e6aa7752.jpeg"
if (file) {
            const base64 = await convertToBase64(file);
            setImage1(base64)
        }
}

converter();

function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }