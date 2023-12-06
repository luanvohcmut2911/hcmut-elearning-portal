import React from "react";
import AdminService from "../../../services/AdminService";
import { Table, Spin } from "antd";
import CourseData from "../../../types/CourseData";
import CourseDetail from "./detail";

const Course = ({ setItems, courseID = null }: { setItems: React.Dispatch<React.SetStateAction<string>>, courseID: string | null}) => {
  console.log("In course component: ", {courseID})
  const [courseList, setCourseList] = React.useState<CourseData[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    AdminService.getCourseList().then(({ data }: { data: CourseData[] }) => {
      data.forEach((d) => {
        const {modified_at} = d;
        d.modified_at = (new Date(modified_at)).toDateString()
      })
      setCourseList(data);
    });
  }, []);
  if(courseID) {
    return <CourseDetail courseID={courseID} />
  }
  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
      render: (text: string) => <a href='/' onClick = {
        (e) => {
          e.preventDefault();
          console.log('read data from course', text)
          setItems(`Course/${text}`)
        }
      } title={text}>{text}</a>
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Course Description",
      dataIndex: "course_description",
      key: "course_description",
    },
    {
      title: "Lecturer ID",
      dataIndex: "lecturer_id",
      key: "lecturer_id",
    },
    {
      title: "Modified at",
      dataIndex: "modified_at",
      key: "modified_at",
    },
  ]

  return (
    <div>
    {
      courseList ? <Table dataSource = {courseList} columns = {columns} rowKey={(d)=>{return d.course_id}} /> : <Spin  />
    }
    </div>
  )
};

export default Course;
