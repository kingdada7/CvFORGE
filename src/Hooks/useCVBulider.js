/*
   * ---------------------------------------------------------
   * PROFILE
   * ---------------------------------------------------------
   */

  const updateProfile = (field, value) => {
    setCVData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [field]: value,
      },
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * EXPERIENCE
   * ---------------------------------------------------------
   */

  const addExperience = () => {
    setCVData((current) => ({
      ...current,
      experiences: [...current.experiences, createExperience()],
    }));

    setIsSaved(false);
  };

  const updateExperience = (experienceId, field, value) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              [field]: value,
            }
          : experience,
      ),
    }));

    setIsSaved(false);
  };

  const deleteExperience = (experienceId) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.filter(
        (experience) => experience.id !== experienceId,
      ),
    }));

    setIsSaved(false);
  };

  const addBullet = (experienceId) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              bullets: [...experience.bullets, ""],
            }
          : experience,
      ),
    }));

    setIsSaved(false);
  };

  const updateBullet = (experienceId, bulletIndex, value) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              bullets: experience.bullets.map((bullet, index) =>
                index === bulletIndex ? value : bullet,
              ),
            }
          : experience,
      ),
    }));

    setIsSaved(false);
  };

  const deleteBullet = (experienceId, bulletIndex) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              bullets: experience.bullets.filter(
                (_, index) => index !== bulletIndex,
              ),
            }
          : experience,
      ),
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * EDUCATION
   * ---------------------------------------------------------
   */

  const addEducation = () => {
    setCVData((current) => ({
      ...current,
      education: [...current.education, createEducation()],
    }));

    setIsSaved(false);
  };

  const updateEducation = (educationId, field, value) => {
    setCVData((current) => ({
      ...current,
      education: current.education.map((item) =>
        item.id === educationId
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));

    setIsSaved(false);
  };

  const deleteEducation = (educationId) => {
    setCVData((current) => ({
      ...current,
      education: current.education.filter((item) => item.id !== educationId),
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * SKILLS
   * ---------------------------------------------------------
   */

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) {
      return;
    }

    if (
      skills.some(
        (existingSkill) => existingSkill.toLowerCase() === skill.toLowerCase(),
      )
    ) {
      setNewSkill("");
      return;
    }

    setCVData((current) => ({
      ...current,
      skills: [...current.skills, skill],
    }));

    setNewSkill("");
    setIsSaved(false);
  };

  const deleteSkill = (skillToDelete) => {
    setCVData((current) => ({
      ...current,
      skills: current.skills.filter((skill) => skill !== skillToDelete),
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * TEMPLATE
   * ---------------------------------------------------------
   */

  const setSelectedTemplate = (template) => {
    setCVData((current) => ({
      ...current,
      selectedTemplate: template,
    }));

    setIsSaved(false);
  };