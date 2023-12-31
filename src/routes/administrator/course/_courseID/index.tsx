// This page includes of lecture, forum and registered student list.

import AdminService from "@services/AdminService";
import { LectureData, QuestionData, StudentData } from "@/types/db";
import React from "react";
import { Table, Typography, Tag, Spin } from "antd";
import LectureDocument from "./document";
import LectureQuizList from "./quiz";

const CourseLecture = ({
  coursePath,
  setItems,
}: {
  coursePath: string;
  setItems: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [lectureList, setLectureList] = React.useState<
    LectureData[] | undefined
  >(undefined);
  const [questionList, setQuestionList] = React.useState<
    QuestionData[] | undefined
  >(undefined);
  const [registeredStudentList, setRegisteredStudentList] = React.useState<
    StudentData[] | undefined
  >(undefined);
  React.useEffect(() => {
    const courseID = coursePath.split("/")[0];

    AdminService.getLectureList(courseID).then(
      ({ data }: { data: LectureData[] }) => {
        setLectureList(data);
      }
    );
    AdminService.getQuestionList(courseID).then(
      ({ data }: { data: QuestionData[] }) => {
        setQuestionList(data);
      }
    );
    AdminService.getRegisteredStudentInCourse(courseID).then(
      ({ data }: { data: StudentData[] }) => {
        setRegisteredStudentList(data);
      }
    );
  }, [coursePath]);

  if (coursePath.split("/").length > 1) {
    const insidePath = coursePath.split("/")[1];
    const docOrQuiz = insidePath.split(" ")[1];
    return docOrQuiz == "Documents" ? (
      <LectureDocument lectureID={coursePath.split("/")[1]} />
    ) : (
      <LectureQuizList lecturePath={coursePath.replace(`${coursePath.split("/")[0]}/`, "")} setItems = {setItems}/>
    );
  }

  const columnsLecture = [
    {
      title: "Lecture ID",
      dataIndex: "lecture_id",
      key: "lecture_id",
    },
    {
      title: "Lecture Name",
      dataIndex: "lecture_name",
      key: "lecture_name",
    },
    {
      title: "Lecture Content",
      dataIndex: "lecture_content",
      key: "lecture_content",
    },
    {
      title: "Documents",
      dataIndex: "lecture_id",
      key: "lecture_id",
      render: (d: string) => {
        return (
          <a
            onClick={() => {
              setItems((prevState) => {
                return prevState + `/${d} Documents`;
              });
            }}
          >
            Documents of {d}
          </a>
        );
      },
    },
    {
      title: "Quizzes",
      dataIndex: "lecture_id",
      key: "lecture_id",
      render: (d: string) => {
        return (
          <a
            onClick={() => {
              setItems((prevState) => {
                return prevState + `/${d} Quizzes`;
              });
            }}
          >
            Quizzes of {d}
          </a>
        );
      },
    },
  ];

  const columnsQuestion = [
    {
      title: "Question ID",
      dataIndex: "question_id",
      key: "question_id",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (d: Date) => {
        return <div>{new Date(d).toDateString()}</div>;
      },
    },
    {
      title: "Question content",
      dataIndex: "question_content",
      key: "question_content",
    },
    {
      title: "Created by",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Answer date",
      dataIndex: "answer_date",
      key: "answer_date",
      render: (d: Date) => {
        return <div>{new Date(d).toDateString()}</div>;
      },
    },
    {
      title: "Answer Content",
      dataIndex: "answer_content",
      key: "answer_content",
    },
    {
      title: "Answered by",
      dataIndex: "lecturer_name",
      key: "lecturer_name",
    },
    {
      title: "Status",
      dataIndex: "lecturer_id",
      key: "status",
      render: (d: string) => {
        return d ? (
          <Tag color="green" key={d}>
            Complete
          </Tag>
        ) : (
          <Tag color="volcano" key={d}>
            In progress
          </Tag>
        );
      },
    },
  ];
  const columnsRegisteredStudent = [
    {
      title: "ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Gender",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Department",
      dataIndex: "department_id",
      key: "department_id",
    },
    {
      title: "Degree",
      dataIndex: "student_degree",
      key: "student_degree",
    },
    {
      title: "Major",
      dataIndex: "student_major",
      key: "student_major",
    },
    {
      title: "Program",
      dataIndex: "student_program",
      key: "student_program",
    },
  ];
  return (
    <div>
      <Typography.Title level={2}>
        Course Lecture of {coursePath}
      </Typography.Title>
      {lectureList ? (
        <Table dataSource={lectureList} columns={columnsLecture} />
      ) : (
        <Spin />
      )}
      <Typography.Title level={2}>
        Course Forum of {coursePath}
      </Typography.Title>
      {lectureList ? (
        <Table dataSource={questionList} columns={columnsQuestion} />
      ) : (
        <Spin />
      )}
      <Typography.Title level={2}>
        Student enrollment of {coursePath}
      </Typography.Title>
      {registeredStudentList ? (
        <Table
          dataSource={registeredStudentList}
          columns={columnsRegisteredStudent}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default CourseLecture;
