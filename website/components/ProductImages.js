import { useState } from "react"
import { styled } from "styled-components"

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`
const BigImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`
const ImageButtons = styled.div`
    display: flex;
    gap: 5px;
    flex-grow: 0;
    margin-top: 10px;
`
const ImageButton = styled.div`
    border: 1px solid #aaa;
    ${props => props.$active ? `
        border-color: #4C1D95; 
    ` : `
        border-color: #ccc;
        opacity: .7;
    `}
    height: 60px;
    padding: 2px;
    cursor: pointer;
`
const BigImageWrapper = styled.div`
    text-align: center;
`

export default function ProductImages({ images }) {
    const [activeImage, setActiveImage] = useState(images?.[0])
    return (
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} />
            </BigImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton
                        key={image}
                        $active={image === activeImage}
                        onClick={() => setActiveImage(image)}
                    >
                        <Image src={image} alt="" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}