interface GenderChecckBoxProps {
  selectedGender: string
  onChangeCheckBox: (gender: "male" | "female") => void
}

const GenderCheckBox = ({
  selectedGender,
  onChangeCheckBox,
}: GenderChecckBoxProps) => {
  return (
    <div className="flex justify-start w-full gap-10">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={selectedGender === "male"}
          onChange={() => onChangeCheckBox("male")}
        />
        <label htmlFor="">Male</label>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={selectedGender === "female"}
          onChange={() => onChangeCheckBox("female")}
        />
        <label htmlFor="">Female</label>
      </div>
    </div>
  )
}

export default GenderCheckBox
