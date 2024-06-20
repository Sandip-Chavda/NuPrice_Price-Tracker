"use client";

import { addUserEmailToProduct } from "@/lib/actions";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { FormEvent, Fragment, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  productId: string;
}

const Modal = ({ productId }: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false);
    setEmail("");
    closeModal();

    toast.success("Email sent Successfully. 👍🏻");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal} type="button" className="searchbar-btn">
        Track Price
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container">
          <div className="min-h-screen px-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* <DialogPanel className="fixed inset-0" /> */}
              <div className="fixed inset-0" />
            </TransitionChild>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />

            <TransitionChild
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 sacle-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 border flex items-center gap-1 border-gray-200 rounded-10">
                      <Image
                        alt="Logo"
                        src={"/assets/icons/logo1.svg"}
                        width={28}
                        height={28}
                      />
                      <p className="nav-logo">
                        Nu<span className="text-primary">Price</span>
                      </p>
                    </div>

                    <Image
                      height={20}
                      width={20}
                      alt="close"
                      src={"/assets/icons/x-close.svg"}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>

                  <h4 className="dialog-head_text">
                    Stay updated with product pricing alerts right in your
                    E-mail inbox.
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts✴️
                  </p>
                </div>

                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 "
                  >
                    E-mail Address :
                  </label>

                  <div className="dialog-input_container">
                    <Image
                      height={18}
                      width={18}
                      alt="mail"
                      src={"/assets/icons/mail.svg"}
                    />

                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      type="email"
                      id="email"
                      placeholder="sandip@gmail.com"
                      className="dialog-input !text-black !font-medium"
                    />
                  </div>

                  <button type="submit" className="searchbar-btn mt-5">
                    {isSubmitting ? "Sending Mail..." : "Get Notify"}
                  </button>
                </form>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
