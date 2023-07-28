import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
`

const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;
`

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 40px;
    img {
        max-width: 100%;
    }
`

const Column = styled.div`
    display: flex;
    align-items: center;
`

const ButtonWrapper = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 25px;
`

export default function Featured({ product }) {
    return (
        <Bg>
            <Center>
                <ColumnWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>{product.description}</Desc>
                            <ButtonWrapper>
                                <ButtonLink href={'/products/' + product._id} $outline={1} $white={1} >Read more</ButtonLink>
                                <Button $white >Add to Cart</Button>
                            </ButtonWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://nhk-nextjs-ecommerce.s3.amazonaws.com/1690216792064.png" />
                    </Column>
                </ColumnWrapper>
            </Center>
        </Bg>
    )
}