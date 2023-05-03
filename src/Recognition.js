import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import PreprocessImage from './Preprocess';
import "./App.css";

function Recognition() {
    const [path, setPath] = useState("");
    const [text, setText] = useState("");
    const [fileType, setFileType] = useState("")
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [accuracy, setAccuracy] = useState("")
    const [lines, setLines] = useState([""])
    const [paragraphs, setParagraphs] = useState([""])
    const [words, setWords] = useState([""])

    const handleChange = async (event) => {
        setPath(URL.createObjectURL(event.target.files[0]));
        await setFileType(event.target.files[0].type)
 
    }

    const handleClick = () => {


        Tesseract.recognize(path, 'eng', {
            logger: m => console.log(m)
        })
            .catch(err => {
                console.error(err);
            })
            .then(async result => {
                let confidence = result.data.confidence
                setAccuracy(confidence);
                let text = result.data.text
                setText(text);
                let lines = await result.data.lines.length;
                setLines(lines)
                let paragraphs = result.data.paragraphs.length;
                setParagraphs(paragraphs)
                let words = result.data.words.length;
                setWords(words)

            })
    }
    return (
        <div className="App">
            <main className="App-main">
                <h1>Optical Character Recognition</h1>
                <h3>Actual Image</h3>
                <img src={path} alt="" ref={imageRef} />
                <canvas ref={canvasRef} width={700} height={250}></canvas>
                {/* <h3>Extracted text</h3>
                <div className="pin-box">
                    <p> {text} </p>
                </div> */}
                <div>
                <input type="file" onChange={handleChange} />
                <button onClick={handleClick} style={{ height: 50 }}>convert to text</button>
                </div>
                <h3>Extracted text from the Image</h3>
                <div className="text-box">
                    <p> {text}</p>
                </div><br />
                <div className="text-box">
                    <div>
                    <p> File Type: {fileType}</p>
                    </div>
                    <p> Accuracy: {accuracy}</p>
                    <div>
                        <p>Lines: {lines}</p>
                    </div>
                    <div>
                        <p>paragraphs: {paragraphs}</p>
                    </div>
                    <div>
                        <p>words: {words}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default Recognition;