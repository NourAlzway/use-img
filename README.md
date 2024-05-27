# useImg React Hook
[![npm version](https://img.shields.io/npm/v/@nouraldeen/use-img.svg)](https://www.npmjs.com/package/@nouraldeen/use-img)
[![npm downloads](https://img.shields.io/npm/dm/@nouraldeen/use-img.svg)](https://www.npmjs.com/package/@nouraldeen/use-img)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@nouraldeen/use-img)](https://www.npmjs.com/package/@nouraldeen/use-img)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@nouraldeen/use-img)](https://www.npmjs.com/package/@nouraldeen/use-img)
[![npm license](https://img.shields.io/npm/l/@nouraldeen/use-img)](https://www.npmjs.com/package/@nouraldeen/use-img)
[![npm types](https://img.shields.io/npm/types/@nouraldeen/use-img)](https://www.npmjs.com/package/@nouraldeen/use-img)

<!-- [![GitHub issues](https://img.shields.io/github/issues/NourAlzway/use-img)](https://github.com/NourAlzway/use-img/issues)
[![GitHub forks](https://img.shields.io/github/forks/NourAlzway/use-img)](https://github.com/NourAlzway/use-img/network)
[![GitHub stars](https://img.shields.io/github/stars/NourAlzway/use-img)](https://github.com/NourAlzway/use-img/stargazers)
[![GitHub license](https://img.shields.io/github/license/NourAlzway/use-img)](https://github.com/NourAlzway/use-img/blob/main/LICENSE) -->


## Description
**useImg** is a react hook that allows you to load images with a loading state and error state, and also allows you to render the image safely when it is loaded and decoded.

## Installation
```bash
npm install @nouraldeen/use-img
```

## Usage
### Simplest usage:
```tsx
import React from 'react';
import useImg from '@nouraldeen/use-img';

const ImageWrapper = () => {

    const { status, image, error } = useImg('https://example.com/image.jpg');

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'error') {
        return <p>Error: {error.message}</p>;
    }

    if (status === 'loaded') {
        return <img src="placeholder.png" alt="image" />;
    }

    return <img src={image.src} alt="image" />;
};

export default ImageWrapper;
```

## API
```typescript
useImg(src: string): { status: 'loading' | 'error' | 'loaded' | "ready", image: HTMLImageElement | null, error: Error | null }
```

## Explanation

by using **status.ready** you can know when the image is loaded and decoded and ready to be rendered safely without any flickering.

example:

```tsx
status.ready && <img src={image.src} alt="image" />
```

other status values are:
- **status.loading**: when the image is still loading.
- **status.error**: when the image failed to load.
- **status.loaded**: when the image is loaded but not decoded yet.


## License
This project is licensed under the MIT License.