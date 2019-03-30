import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import { RingLoader } from 'react-spinners'

interface State {
    loading: boolean
}

class App extends React.Component<{}, State> {
    private imgRef: React.RefObject<HTMLImageElement>
    private canvasRef: React.RefObject<HTMLCanvasElement>

    constructor(props) {
        super(props)
        this.imgRef = React.createRef<HTMLImageElement>()
        this.canvasRef = React.createRef<HTMLCanvasElement>()
        this.state = {
            loading: false
        }
    }

    drawImageToCanvas = () => {
        const ctx = this.canvasRef.current.getContext('2d')
        ctx.drawImage(this.imgRef.current, 0, 0)
        this.detect()
    }

    async detect() {
        this.setState({loading: true})
        const model = await cocoSsd.load()
        const predictions: cocoSsd.DetectedObject[] = await model.detect(this.imgRef.current);
        this.setState({loading: false})
        const ctx = this.canvasRef.current.getContext('2d')
        predictions.forEach((pred: cocoSsd.DetectedObject) => {
            ctx.font = "24px Roboto";
            ctx.fillStyle = "white";
            ctx.fillText(pred.class, pred.bbox[0], pred.bbox[1])
            ctx.rect(...pred.bbox)
            ctx.stroke()
        })
    }
    
    componentDidMount() {
        this.imgRef.current.onload = this.drawImageToCanvas
    }

    get image() {
        return (
            <section>
                <h1>Carmen & The Mo</h1>
                <img hidden ref={this.imgRef} src="assets/images/momo.png"></img>
                <canvas ref={this.canvasRef} height="960" width="638"></canvas>
                <RingLoader loading={this.state.loading} size={100} sizeUnit={"px"} />
            </section>
        )
    }

    render() {
        return this.image
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App />, document.getElementById("app"))
})