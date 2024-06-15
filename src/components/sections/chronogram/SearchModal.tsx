import SearchIcon from "@mui/icons-material/Search";
import { ModalTalleres } from "@/consts/chonogram";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

interface Props {
  el: string | ModalTalleres;
}

const SearchModal = ({ el }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={"center flex gap-2 text-base"}>
      {typeof el === "string" && el}
      {isModalTalleres(el) && (
        <>
          {el?.title}
          <span
            className="inline-grid items-center justify-center gap-4 rounded-full bg-white/30 p-[2px]  transition-all hover:bg-white hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <SearchIcon fontSize="small" />
          </span>
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="grid place-items-center justify-center"
          >
            <Card className="max-h-[80vh] w-[95%] overflow-scroll text-primary">
              <CardHeader
                title={el?.title.toUpperCase()}
                className="font-bold"
              />
              <Divider />
              <CardContent className="flex flex-col gap-10 lg:flex-row">
                {el?.content.map((el, index) => (
                  <div key={index} className="lg:w-[25%]">
                    <span className="text-1xl lg:h[40px] font-bold">
                      {el.title}
                    </span>
                    {el.description.map((elDesc, index) => (
                      <React.Fragment key={index}>
                        <div className=" mt-2 text-xs font-bold lg:mt-4">
                          <i>{elDesc.split("-")[0]}</i>
                        </div>
                        <div className="text-xs">{elDesc.split("-")[1]}</div>
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          </Modal>
        </>
      )}
    </li>
  );
};

export default SearchModal;

const isModalTalleres = (el: any): el is ModalTalleres => {
  return el && el.title && typeof el.title === "string";
};
