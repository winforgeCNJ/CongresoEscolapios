interface Props {
  firstName: React.MutableRefObject<HTMLInputElement | null>;
  lastName: React.MutableRefObject<HTMLInputElement | null>;
  DNI: React.MutableRefObject<HTMLInputElement | null>;
}

const MyFormdata = ({ DNI, firstName, lastName }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <input ref={firstName} placeholder="FistName" style={{ padding: "1rem 2rem", fontSize: "2rem" }} />
      <input ref={lastName} placeholder="LastName" style={{ padding: "1rem 2rem", fontSize: "2rem" }} />
      <input ref={DNI} placeholder="DNI" style={{ padding: "1rem 2rem", fontSize: "2rem" }} />
    </div>
  );
};

export default MyFormdata;
