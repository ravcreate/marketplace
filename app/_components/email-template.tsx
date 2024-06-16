import Link from "next/link";
import * as React from "react";

interface EmailTemplateProps {
    link: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    link,
}) => (
    <div>
        <h1>Thanks for ordering.</h1>
        <a href={link}>Click here to download.</a>
    </div>
);

export default EmailTemplate;
