import { clone } from 'gl-vec2';
import { InputStream } from '../input/input_stream.d';
import ImageWrapper from '../common/image_wrapper';
import BarcodeLocator from '../locator/barcode_locator';

type BufferReturn = {
    inputImageWrapper: ImageWrapper;
    // boxSize should be like [[ number, number], ...] but clone's signature doesn't seem to allow that
    boxSize: Array<Array<number>>;
};

// TODO: need typescript def for BarcodeLocator
export default function initBuffers(
    inputStream: InputStream,
    imageWrapper: ImageWrapper | undefined,
    locator: any,
): BufferReturn {
    const inputImageWrapper = imageWrapper || new ImageWrapper({
        x: inputStream.getWidth(),
        y: inputStream.getHeight(),
        type: 'XYSize',
    });

    if (ENV.development) {
        console.log(`image wrapper size ${inputImageWrapper.size}`);
    }
    const boxSize = [
        clone([0, 0]),
        clone([0, inputImageWrapper.size.y]),
        clone([inputImageWrapper.size.x, inputImageWrapper.size.y]),
        clone([inputImageWrapper.size.x, 0]),
    ];
    BarcodeLocator.init(inputImageWrapper, locator);
    return { inputImageWrapper, boxSize };
}
