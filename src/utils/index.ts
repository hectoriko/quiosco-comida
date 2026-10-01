export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    }).format(amount);
}

export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = "https://res.cloudinary.com";
    const isCloudinaryUrl = imagePath.startsWith(cloudinaryBaseUrl);
    
    return isCloudinaryUrl
        ? imagePath
        : `/products/${imagePath}.jpg`;    
}