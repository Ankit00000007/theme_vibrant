import React, { useState } from "react";
import "./grievancecell.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

const GrievanceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {
      name: "",
      userId:"",
      phone:"",
      email:"",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.userId.trim()) {
      newErrors.userId = "User ID is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
      // Reset form
      setFormData({
        name: "",
        userId: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen p-4 flex justify-center items-center my-bg">
      <Card className="w-full max-w-2xl border-none">
        <CardHeader className="text-black rounded-t-lg page-heading">
          <CardTitle className="text-2xl font-bold text-center my-heading">
            Grievance Cell
          </CardTitle>
          <div className="text-center mt-2 space-y-1">
            <p className="text-white">Email: Grievance@vibrant-science.com</p>
            <p className="text-white">Nodal Officer: Vignesh</p>
          </div>
        </CardHeader>
        <CardContent className="p-6 my-card-bg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  name="userId"
                  placeholder="User ID"
                  value={formData.userId}
                  onChange={handleChange}
                  className={`w-full ${errors.userId ? "border-red-500" : ""}`}
                />
                {errors.userId && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.userId}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full min-h-[150px] ${
                    errors.message ? "border-red-500" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white py-2 px-4 rounded-lg  my-btn"
            >
              Submit
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrievanceForm;
