import React, { useState } from "react";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

interface ContactFormProps {
    style: {
        readonly [key: string]: string;
    };
    submitName: string
    initialContact?: Contact
    handleDone: (contact: Contact) => void;
}
export default function ContactForm({ style, submitName, initialContact, handleDone }: ContactFormProps) {
    const [contact, setContact] = useState<Contact>(initialContact ? initialContact : {
        name: "",
        vacancy: "",
        phone: "",
        id: "",
    });

    const [errors, setErrors] = useState<Errors>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        if (name === "phone") {
            processedValue = formatPhone(value);
        }

        setContact((prev) => ({ ...prev, [name]: processedValue }));

        const error = validateField(name as keyof Contact, processedValue);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: validateField("name", contact.name),
            vacancy: validateField("vacancy", contact.vacancy),
            phone: validateField("phone", contact.phone),
        };

        setErrors(newErrors);

        if (!newErrors.name && !newErrors.vacancy && !newErrors.phone) {
            handleDone(contact)
            console.log("Form submitted");
        }
    };

    const formatPhone = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        const limited = cleaned.slice(0, 11);

        let formatted = "";
        if (limited.length > 0) formatted = `+${limited[0]}`;
        if (limited.length > 1) formatted += ` ${limited.slice(1, 4)}`;
        if (limited.length > 4) formatted += ` ${limited.slice(4, 7)}`;
        if (limited.length > 7) formatted += ` ${limited.slice(7, 9)}`;
        if (limited.length > 9) formatted += ` ${limited.slice(9, 11)}`;

        return formatted;
    };

    const validateField = (name: keyof Contact, value: string): string => {
        if (name === "name" || name === "vacancy") {
            if (!value) return "This field is required";
            if (!/^[a-zA-Z]+$/.test(value)) return "Only English letters allowed";
            if (value.length < 2) return "Minimum 2 characters";
            if (value.length > 20) return "Maximum 20 characters";
        }

        if (name === "phone") {
            if (!value) return "Phone number is required";
            if (!/^\+\d \d{3} \d{3} \d{2} \d{2}$/.test(value)) {
                return "Format: +X XXX XXX XX XX";
            }
        }

        return "";
    };
    return (
        <form
            className={`${style["contact-actions_form"]} ${style["block"]}`}
            onSubmit={handleSubmit}
        >
            <Input
                name="name"
                value={contact.name}
                onChange={handleChange}
                placeholder={initialContact ? contact.name : "Name"}
                pattern="[a-zA-Z]{2,20}"
                title={errors.name || undefined}
            />
            <Input
                name="vacancy"
                value={contact.vacancy}
                onChange={handleChange}
                placeholder={initialContact ? contact.vacancy : "Vacancy"}
                pattern="[a-zA-Z]{2,20}"
                title={errors.vacancy || undefined}
            />
            <Input
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                title={errors.phone || undefined}
                pattern="^\+\d \d{3} \d{3} \d{2} \d{2}$"
                placeholder={initialContact ? contact.phone : "Phone +X XXX XXX XX XX"}
            />
            <Button type="submit">{submitName}</Button>
        </form>
    );
}
