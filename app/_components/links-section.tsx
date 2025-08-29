"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { GripVertical, Plus, Trash } from "lucide-react";
import { NoLinksIcon } from "@/components/icons";
import { Reorder, useDragControls } from "framer-motion";
import { LinkProps, useLinksStore } from "@/context/links";
import { platforms } from "@/constants";
import { Input } from "@heroui/input";
import { v4 as randomUUID } from "uuid";
import SaveLinksButton from "./save-links-button";

const LinksSection = () => {
  const {
    links: linksFromStore,
    updateLinks,
    addNewLink,
    deleteLink,
  } = useLinksStore();
  const [links, setLinks] = useState(linksFromStore);
  const [orderedLinks, setOrderdLinks] = useState(linksFromStore);
  const [addLinkIsPending, setAddLinkIsPending] = useState(false);

  useEffect(() => {
    useLinksStore.persist.onHydrate((state) => setLinks(state.links));
    useLinksStore.persist.rehydrate();
  }, []);
  useEffect(() => {
    setOrderdLinks(links.map((link, i) => ({ ...link, order: i + 1 })));
  }, [links]);

  useEffect(() => {
    updateLinks(orderedLinks);
  }, [orderedLinks, updateLinks]);

  const handleAddNewLink = () => {
    setAddLinkIsPending(true);
    const theNewLink = {
      id: "local-id-" + randomUUID(),
      order: links.length + 1,
      platformName: platforms[0].name,
      url: "",
    };
    addNewLink(theNewLink);
    setLinks((prev) => [...prev, theNewLink]);
    setAddLinkIsPending(false);
  };
  const isValideToSave = () => {
    return (
      orderedLinks
        .map(
          (l) =>
            l.url !== "" &&
            l.url.startsWith(
              getPlatformDetailsByName(l.platformName)?.urlStartWith || ""
            )
        )
        .filter((l) => l === false).length == 0
    );
  };
  return (
    <>
      <div className="flex-grow relative w-full">
        <div className="size-full flex flex-col absolute left-0 top-0 overflow-x-hidden overflow-y-auto without-scrollbar">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Customize your links
          </h2>
          <p className="text-neutral-500 lg:text-lg mb-6">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button
            color="primary"
            variant="ghost"
            className="w-full font-medium mb-4"
            disabled={addLinkIsPending}
            onPress={handleAddNewLink}>
            <Plus size={16} /> Add new link
          </Button>
          {orderedLinks.length === 0 ? (
            <div className="bg-neutral-100 p-4 rounded-2xl gap-2 flex-grow flex flex-col items-center justify-center">
              <NoLinksIcon />
              <h2 className="text-2xl font-bold">Let’s get you started</h2>
              <p className="text-neutral-500 text-center max-w-md">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          ) : (
            <div className="py-4 gap-2 flex-grow relative overflow-hidden">
              <div className="absolute size-full left-0 top-0 py-4 overflow-x-hidden overflow-y-auto without-scrollbar">
                <Reorder.Group
                  layoutScroll
                  axis="y"
                  values={orderedLinks}
                  onReorder={setLinks}>
                  {orderedLinks.map((link) => (
                    <DragItem
                      key={link.id}
                      link={link}
                      setLinks={setLinks}
                      setOrderdLinks={setOrderdLinks}
                      deleteLink={deleteLink}
                    />
                  ))}
                </Reorder.Group>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-neutral-300 pt-2 mt-2 flex items-end justify-end">
        <SaveLinksButton isDisabled={!isValideToSave()} />
      </div>
    </>
  );
};

const DragItem = ({
  link,
  setLinks,
  setOrderdLinks,
  deleteLink,
}: {
  link: LinkProps;
  setLinks: (props: any) => void;
  setOrderdLinks: (props: any) => void;
  deleteLink: (id: string) => void;
}) => {
  const [inputField, setInputField] = useState(link.url);
  const controls = useDragControls();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const defaultPlatform =
    getPlatformDetailsByName(link.platformName) || platforms[0];

  const handleDeleteLink = () => {
    setLinks((prev: LinkProps[]) =>
      prev
        .filter((l) => l.id !== link.id)
        .map((l, i) => ({ ...l, order: i + 1 }))
    );
    deleteLink(link.id);
  };

  // Debounced update function
  const debouncedUpdate = useCallback(
    (name: string, value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setOrderdLinks((prev: LinkProps[]) =>
          prev.map((l) =>
            l.order === link.order ? { ...l, [name]: value } : l
          )
        );
      }, 300);
    },
    [link.order, setOrderdLinks]
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedUpdate(e.target.name, e.target.value);
  };

  return (
    <Reorder.Item
      value={link}
      key={link.platformName}
      dragListener={false}
      dragControls={controls}
      className="bg-neutral-100 rounded-2xl p-4 mb-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center gap-2">
          <GripVertical
            size={24}
            onPointerDown={(e) => {
              e.preventDefault();
              controls.start(e);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
            }}
            style={{ touchAction: "none" }}
            className="text-neutral-500 cursor-grab active:cursor-grabbing rounded-sm hover:bg-neutral-200"
          />
          <p className="font-bold select-none">#Link {link.order}</p>
        </div>
        <Button
          color="danger"
          variant="faded"
          isIconOnly
          size="sm"
          onPress={handleDeleteLink}>
          <Trash size={14} />
        </Button>
      </div>
      <div className="select-none mb-4">
        <label htmlFor="" className="text-sm text-neutral-500">
          Platform
        </label>
        <Select
          radius="sm"
          defaultSelectedKeys={[defaultPlatform.name]}
          onChange={(e) =>
            setOrderdLinks((prev: LinkProps[]) =>
              prev.map((l) =>
                l.order === link.order
                  ? { ...link, platformName: e.target.value }
                  : l
              )
            )
          }
          color="primary"
          variant="faded"
          startContent={defaultPlatform.icon()}>
          {platforms.map((platform) => (
            <SelectItem key={platform.name} textValue={platform.name}>
              <div className="flex items-center gap-2 py-1">
                {platform.icon()} {platform.name}
              </div>
            </SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <label htmlFor="" className="text-sm text-neutral-500">
          Link
        </label>
        <Input
          type="url"
          placeholder={defaultPlatform.urlStartWith}
          name="url"
          onChange={(e) => {
            setInputField(e.target.value);
            handleChangeInput(e);
          }}
          defaultValue={link.url}
          errorMessage="Invalide url pattern please a correct url!"
          isInvalid={
            !inputField.startsWith(
              getPlatformDetailsByName(link.platformName)?.urlStartWith || ""
            )
          }
          variant="bordered"
          radius="sm"
        />
      </div>
    </Reorder.Item>
  );
};

const getPlatformDetailsByName = (name: string) => {
  return platforms.find((p) => p.name === name);
};

export default LinksSection;
