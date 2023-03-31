import React from "react";

const Components = () => {
  return (
    <main className="flex flex-wrap gap-8 p-8">
      {/* PRIMARY BUTTON */}
      <button className="btn-primary btn">Primary Button</button>

      {/* SECONDARY BUTTON */}
      <button className="btn-secondary btn">Secondary Button</button>

      {/* PRIMARY INPUT */}
      <input
        type="text"
        className="input-primary input w-full max-w-xs"
        placeholder="Primary input"
      />

      {/* SECONDARY INPUT */}
      <input
        type="text"
        className="input-secondary input w-full max-w-xs"
        placeholder="Secondary input"
      />

      {/* DROPDOWN */}
      <div className="dropdown">
        <label tabIndex={0} className="btn-secondary btn m-1">
          DROPDOWN
        </label>
        <ul tabIndex={0} className="dropdown-content menu w-52 p-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>

      {/* MODAL */}
      <label htmlFor="my-modal-4" className="btn-secondary btn">
        open modal
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
          <p className="py-4">
            You are been selected for a chance to get one year of subscription to use Wikipedia for
            free!
          </p>
        </label>
      </label>

      {/* TOOLTIP */}
      <div className="tooltip tooltip-accent" data-tip="hello">
        <button className="btn-secondary btn">TOOLTIP</button>
      </div>

      {/* CHECKBOX */}
      <input type="checkbox" defaultChecked className="checkbox-primary checkbox" />

      {/* TEXTAREA */}
      <textarea className="textarea-secondary textarea" placeholder="Bio"></textarea>

      {/* DRAWER */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn-primary drawer-button btn">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu w-80 bg-base-100 p-4 text-base-content">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Components;
