import './DialogueWindow.css';
import HButton from './HButton';

// mixBlendMode: 'plus-lighter',
// backgroundColor: 'rgba(0, 0, 248, 0.38)'

// brown:
// mixBlendMode: 'color',
// backgroundColor: 'rgba(139, 69, 19, 0.5)'

/*
 * type:    0   no button
 *          1   ok
 *          2   ok & cancel
 */

const IMAGE_OK = 'assets/ButtonOk.png';
const IMAGE_CANCEL = 'assets/ButtonCancel.png';

const DialogueWindow = ({ width, height, type, content, onOk, onCancel }) => {
    const style = {
        width: `${width}px`,
        height: `${height}px`
    };

    return (
        <div className='dialogue-wrapper'>
            <div className='dialogue' style={style}>
                <p>{content}</p>
                <div className='dialogue-bg'></div>
                <div className='dialogue-buttons'>
                    {type >= 1 &&
                        <HButton id={21} width={66} height={32} isAnimated={true} image={IMAGE_OK} callback={onOk}/>
                    }
                    {type >= 2 &&
                        <HButton id={22} width={66} height={32} isAnimated={true} image={IMAGE_CANCEL} callback={onCancel}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default DialogueWindow;