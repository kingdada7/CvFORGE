import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import MinimalTemplate from "./MinimalTemplate";

const TemplateRenderer = ({
  template,
  profile,
  experiences,
  education,
  skills,
}) => {
  const templateProps = {
    profile,
    experiences,
    education,
    skills,
  };

  switch (template) {
    case "classic":
      return <ClassicTemplate {...templateProps} />;

    case "minimal":
      return <MinimalTemplate {...templateProps} />;

    case "modern":
    default:
      return <ModernTemplate {...templateProps} />;
  }
};

export default TemplateRenderer;