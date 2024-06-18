import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

export default function ProductEmail({ link }: { link: string }) {
    // Fixes a double quote bug when using it in the Button Href
    const new_link = link.replace(/"/g, "");

    return (
        <Html>
            <Head />
            <Preview>Your product is here...</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container style={container}>
                        <Text className="text-2xl font-semibold">
                            Hi Friend
                        </Text>
                        <Text className="text-lg text-gray-600">
                            Thank you for buying your product from NextGear
                        </Text>
                        <Section className="w-full flex justify-center mt-7">
                            <Button
                                href={new_link}
                                style={{
                                    color: "#61dafb",
                                    padding: "10px 20px",
                                }}
                            >
                                Click Here to Download
                            </Button>
                        </Section>
                        <Text className="text-lg text-gray-600">
                            Best Regards, <br /> The Marketplace
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};
