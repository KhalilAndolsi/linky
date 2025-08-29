"use client";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

const DomainForm = ({
  currentDomain,
  HOSTNAME,
}: {
  currentDomain: string;
  HOSTNAME: string;
}) => {
  const [inputField, setInputField] = useState(currentDomain);
  const [isPending, setIsPending] = useState(false);

  const handleChangeDomain = async () => {
    setIsPending(true);
    try {
      if (!inputField) {
        return addToast({
          title: "Domain name",
          description: "Please write your domain!",
          variant: "flat",
          color: "warning",
        });
      }
      const domain = checkDomainName(inputField);
      console.log(domain);
      if (!domain) {
        return addToast({
          title: "Domain name",
          description: "This domain is not correct form!",
          variant: "flat",
          color: "danger",
        });
      } else if (["preview", "auth", "api"].includes(domain)) {
        return addToast({
          title: "Domain name",
          description: "This domain is already taken",
          variant: "flat",
          color: "danger",
        });
      }
      const response = await fetch("/api/profile/domain", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: inputField }),
      });
      const data = await response.json();
      if (data.error) {
        return addToast({
          title: "Domain",
          description: data.message,
          color: "danger",
          variant: "flat",
        });
      }
      addToast({
        title: "Update Domain",
        description: "update has been successfully ✅",
        color: "success",
        variant: "flat",
      });
      // open the `${HOSTNAME}/${domain}` in new tab
      const newWindow = window.open(`${HOSTNAME}/${domain}`, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    } catch (err) {
      console.error(err);
      addToast({
        title: "Update Domain",
        description: "update has been erro ❌",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <header className="flex-shrink-0 p-2 md:p-4 z-20">
      <div className="flex bg-white p-2 md:p-4 rounded-2xl gap-2">
        <Input
          color="primary"
          variant="faded"
          placeholder="domain"
          className="[&_input]:!px-0"
          defaultValue={inputField}
          onChange={(e) => setInputField(e.target.value)}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">{HOSTNAME}/</span>
            </div>
          }
          type="text"
        />
        <Button
          color="primary"
          className="disabled:opacity-50"
          onPress={handleChangeDomain}
          disabled={
            isPending || inputField === "" || inputField === currentDomain
          }
          isLoading={isPending}>
          Publich
        </Button>
      </div>
    </header>
  );
};

const checkDomainName: (domain: string) => string | null = (domain: string) => {
  /*
    - only A-Z and numbers (0 - 9)
    - Without start and end with "-"
    - Without any other caracter
  */
  const fixedDomain = domain
    .split("")
    .filter(
      (c) =>
        (c.toLowerCase() >= "a" && c.toLowerCase() <= "z") ||
        !isNaN(parseInt(c)) ||
        [" ", "-"].includes(c)
    )
    .join("");
  if (
    fixedDomain.length !== domain.length ||
    [fixedDomain[0], fixedDomain[fixedDomain.length - 1]].includes("-")
  ) {
    return null;
  }
  return fixedDomain.trim().replaceAll(" ", "-");
};

export default DomainForm;
