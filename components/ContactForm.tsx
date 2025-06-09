/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";


function ContactForm() {
  const { toast } = useToast();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    try {
      const emailParams = {
        name: userInput.name,
        email: userInput.email,
        message: userInput.message
      };

      const res = await emailjs.send(serviceID!, templateID, emailParams, userID);

      if (res.status === 200) {
        toast({
          title: '"Message sent successfully!"'
        });
        setUserInput({
          name: "",
          email: "",
          message: ""
        });
      }
    } catch (error: any) {
      toast({
          title: 'Cannot send email'
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Your Name:</label>
        <input
          type="text"
          name="name"
          value={userInput.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Your Email:</label>
        <input
          type="email"
          name="email"
          value={userInput.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Your Message:</label>
        <textarea
          name="message"
          value={userInput.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Send Message</button>
    </form>
  );
}

export default ContactForm;