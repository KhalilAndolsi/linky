"use client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/context/profile";
import { useDebounce } from "@/hooks/useDebounce";
import SaveDetailsButton from "./save-details-button";

const ProfileSection = () => {
  const { info, updateInfo } = useProfileStore();
  useEffect(() => {
    useProfileStore.persist.onHydrate((state) => {
      updateInfo(state.info);
    });
    
    useProfileStore.persist.rehydrate();
  }, [updateInfo]);
  const [pfp, setPfp] = useState(info.profilePicture);
  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSaveImage = async (image: File) => {
    const base64 = await convertToBase64(image);
    updateInfo({ ...info, profilePicture: base64 as string });
  };
  const checkImageFileSize: (image: File) => boolean = (image) => {
    if (image.size / (1024 * 1024) > 5) {
      //TODO: add toast here
      return false;
    }
    return true;
  };
  const debouncedUpdate = useDebounce(updateInfo, 300);
  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedUpdate({ ...info, [e.target.name]: e.target.value });
  };
  const isValideToSave = () => {
    return info.firstName.trim().length >= 3 && info.lastName.trim().length >= 3;
  };
  return (
    <>
      <div className="flex-grow relative w-full">
        <div className="size-full absolute left-0 top-0 overflow-x-hidden overflow-y-auto without-scrollbar">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Profile Details
          </h2>
          <p className="text-neutral-500 lg:text-lg mb-6">
            Add your details to create a personal touch to your profile
          </p>
          <div className="bg-neutral-100 p-4 rounded-2xl mb-4 lg:flex items-center justify-between">
            <p className="mb-2 text-lg font-medium">Profile Picture</p>
            <div className="xl:flex items-center gap-2">
              <label
                htmlFor="file-upload"
                style={
                  pfp
                    ? {
                        backgroundImage: `url(${pfp})`,
                        color: "white",
                        textShadow: "-1px 2px 2px #000000e5",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}
                }
                className="cursor-pointer size-44 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-col gap-2">
                <input
                  type="file"
                  id="file-upload"
                  hidden
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) => {
                    if (
                      e.target.files &&
                      e.target.files[0] &&
                      checkImageFileSize(e.target.files[0])
                    ) {
                      setPfp(URL.createObjectURL(e.target.files[0]));
                      handleSaveImage((e.target.files as FileList)[0]);
                    }
                  }}
                />
                <ImageIcon
                  size={28}
                  style={
                    pfp ? { filter: "drop-shadow(-1px 2px 2px #000000e5)" } : {}
                  }
                />
                <span className="font-medium">+ Upload Image</span>
              </label>
              <p className="mt-5 text-xs text-neutral-500 xl:max-w-52">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>
          <div className="bg-neutral-100 p-4 rounded-2xl grid grid-cols-3 gap-y-2 xl:gap-y-3 items-center">
            <label className="text-nowrap text-sm sm:text-base xl:text-lg font-medium text-neutral-500 col-span-1">
              First name
            </label>
            <Input
              color="primary"
              variant="bordered"
              radius="sm"
              defaultValue={info.firstName}
              name="firstName"
              onChange={handleInputsChange}
              errorMessage="First name is important and Contains at least three letters"
              isInvalid={info.firstName.trim().length < 3}
              placeholder="e.g. John"
              className="col-span-2"
              type="text"
            />

            <label className="text-nowrap text-sm sm:text-base xl:text-lg font-medium text-neutral-500 col-span-1">
              Last name
            </label>
            <Input
              color="primary"
              variant="bordered"
              radius="sm"
              defaultValue={info.lastName}
              name="lastName"
              onChange={handleInputsChange}
              errorMessage="Last name is important and Contains at least three letters"
              isInvalid={info.lastName.trim().length < 3}
              placeholder="e.g. Appleseed"
              className="col-span-2"
              type="text"
            />

            <label className="text-nowrap text-sm sm:text-base xl:text-lg font-medium text-neutral-500 col-span-1">
              Email
            </label>
            <Input
              color="primary"
              variant="bordered"
              radius="sm"
              defaultValue={info.email}
              name="email"
              onChange={handleInputsChange}
              placeholder="e.g. example@gmail.com"
              className="col-span-2"
              type="email"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-300 pt-2 mt-2 flex items-end justify-end">
        <SaveDetailsButton isDisabled={!isValideToSave()} />
      </div>
    </>
  );
};

export default ProfileSection;
