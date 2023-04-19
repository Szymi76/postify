// import React, { useRef } from "react";
// import { Dropdown, DropdownItem, useDropdown } from "~/hooks/useDropdown";
// import { Modal, ModalContent, ModalFooter, ModalTitle, useModal } from "~/hooks/useModal";
// import { api } from "~/utils/api";

import PostContainer from "~/components/PostContainer/PostContainer";
import ScrollablePage from "~/layouts/ScrollablePage";

// const Sandbox = () => {
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const modalButtonRef = useRef<HTMLButtonElement>(null);
//   const { toggle, dropdownProps } = useDropdown([buttonRef]);
//   const { open: openModal, close: closeModal, modalProps } = useModal([modalButtonRef]);

//   return (
//     <div className="flex gap-2 p-10">
//       <div className="relative flex w-min">
//         <button
//           ref={buttonRef}
//           className="btn-secondary btn-sm btn whitespace-nowrap"
//           onClick={toggle}
//         >
//           Open / Close dropdown!
//         </button>

//         <Dropdown {...dropdownProps} className="top-11">
//           <DropdownItem>First dropdown item</DropdownItem>
//           <DropdownItem>Second dropdown item</DropdownItem>
//         </Dropdown>
//       </div>
//       <button
//         ref={modalButtonRef}
//         className="btn-secondary btn-sm btn whitespace-nowrap"
//         onClick={openModal}
//       >
//         Open modal!
//       </button>
//       <Modal {...modalProps}>
//         <ModalTitle>Some modal title Some modal title</ModalTitle>
//         <ModalContent>
//           <p className="text-sm text-gray-500">Modal description as an content!</p>
//         </ModalContent>
//         <ModalFooter>
//           <button className="btn-secondary btn-sm btn" onClick={closeModal}>
//             Anuluj
//           </button>
//           <button className="btn-error btn-sm btn" onClick={closeModal}>
//             Zamknij
//           </button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default Sandbox;

const Sandbox = () => {
  return (
    <ScrollablePage>
      <div className="content-wrapper">
        <PostContainer postId="clgnxuzei0000v2j4nyi4um7c" fullSection={true} />
      </div>
    </ScrollablePage>
  );
};

export default Sandbox;
