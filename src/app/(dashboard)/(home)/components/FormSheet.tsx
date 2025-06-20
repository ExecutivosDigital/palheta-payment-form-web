"use client";
import { Sheet, SheetContent } from "@/src/components/ui/sheet";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Step0 } from "./Step0";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { Step6 } from "./Step6";
import { Step7 } from "./Step7";

interface FormSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FormSheet({ open, setOpen }: FormSheetProps) {
  const { formData } = useFormContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [allowNextStep, setAllowNextStep] = useState(false);
  const [isIphone, setIsIphone] = useState(false);

  const HandleNextStep = () => {
    if (currentStep === 0) {
      if (formData.name === "" || formData.email === "") {
        return toast.error("Insira seu nome e email");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 1) {
      if (formData.cpfCnpj === "") {
        return toast.error("Insira seu CPF ou CNPJ");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      if (formData.zipCode === "" || formData.number === "") {
        return toast.error("Insira seu CEP e número");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 3) {
      if (formData.services?.length === 0) {
        return toast.error("Escolha um ou mais serviços");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 4) {
      if (formData.area === null || formData.numberOfFloors === null) {
        return toast.error("Preencha corretamente os campos abaixo");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 5) {
      if (formData.expectedCapacity === null) {
        return toast.error("Selecione a capacidade esperada");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 6) {
      return setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (currentStep === 0) {
      if (formData.name === "" || formData.email === "") {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 1) {
      if (formData.cpfCnpj === "") {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 2) {
      if (formData.zipCode === "" || formData.number === "") {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 3) {
      if (formData.services?.length === 0) {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 4) {
      if (formData.area === null || formData.numberOfFloors === null) {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 5) {
      if (formData.expectedCapacity === null) {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 6) {
      setAllowNextStep(true);
    }
  }, [formData, currentStep]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isIphonee = navigator.userAgent.includes("iPhone");
      if (isIphonee) setIsIphone(true);
    }
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className={cn(
          "min-h-1/2 flex flex-col w-full lg:w-[500px] lg:mx-auto justify-between ",
          currentStep === 4 && "h-[80vh] max-h-max min-h-80",
          isIphone && " ",
          isIphone && currentStep === 4 && "  h-[80vh]"
        )}
      >
        {currentStep > 0 && (
          <ArrowLeft
            className="text-[#123262] absolute top-2 left-2 w-6 h-6"
            onClick={() => {
              setCurrentStep(currentStep - 1);
            }}
          />
        )}
        {currentStep === 0 ? (
          <Step0 />
        ) : currentStep === 1 ? (
          <Step1 />
        ) : currentStep === 2 ? (
          <Step2 />
        ) : currentStep === 3 ? (
          <Step3 />
        ) : currentStep === 4 ? (
          <Step4 />
        ) : currentStep === 5 ? (
          <Step5 />
        ) : currentStep === 6 ? (
          <Step6 />
        ) : currentStep === 7 ? (
          <Step7 />
        ) : (
          <></>
        )}
        <button
          onClick={HandleNextStep}
          className={cn(
            "w-full h-12 bg-gradient-to-b from-[#123262dd] to-[#123262] shadow-md border border-[#123262] text-white font-bold text-lg rounded-xl transition duration-300",
            !allowNextStep && "opacity-50 cursor-not-allowed"
          )}
        >
          PRÓXIMO
        </button>
      </SheetContent>
    </Sheet>
  );
}
