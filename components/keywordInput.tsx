import React, { useState, KeyboardEvent } from "react";
import styled from "styled-components";
import CancelIcon from "@/img/x-close.svg?url";
import Image from "next/image";
const Wrapper = styled.div`
  margin-top: 8px;
  .tags-input-container {
    width: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    padding: 12px 12px;
  }

  .tag-item {
    display: flex;
    padding: 2px 4px 2px 9px;
    border-radius: 6px;
    border: 1px solid #d0d5dd;
    background: #fff;
    gap: 3px;
    align-items: center;
  }
  .text {
    color: #344054;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }
  img {
    cursor: pointer;
  }
  .tags-input {
    flex-grow: 1;
    padding: 0.5em 0;
    border: none;
    outline: none;
  }
`;

interface TagsInputProps {
  onTagsChange: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();

    if (e.key === "Enter" || e.key === ",") {
      const newTags = value.split(",").map((tag) => tag.trim());
      const nonEmptyTags = newTags.filter((tag) => tag !== "");

      if (nonEmptyTags.length > 0) {
        setTags((prevTags) => [...prevTags, ...nonEmptyTags]);
        e.currentTarget.value = "";
        onTagsChange([...tags, ...nonEmptyTags]);
      }
    }
  };

  const removeTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  return (
    <Wrapper>
      <div className="tags-input-container">
        {tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
            <Image onClick={() => removeTag(index)} src={CancelIcon} alt="" />
          </div>
        ))}
        <input
          onKeyDown={handleKeyDown}
          type="text"
          className="tags-input"
          placeholder="Type something"
        />
      </div>
    </Wrapper>
  );
};

export default TagsInput;
