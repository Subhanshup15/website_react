<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          $courses = [
            ['code' => 'CSE101', 'name' => 'Computer Fundamentals', 'credit' => 3],
            ['code' => 'CSE102', 'name' => 'Programming in C', 'credit' => 4],
            ['code' => 'CSE103', 'name' => 'Data Structures', 'credit' => 4],
            ['code' => 'CSE104', 'name' => 'Database Management Systems', 'credit' => 3],
            ['code' => 'CSE105', 'name' => 'Operating Systems', 'credit' => 3],
            ['code' => 'CSE106', 'name' => 'Web Development Basics', 'credit' => 2],
            ['code' => 'CSE107', 'name' => 'Object Oriented Programming (Java)', 'credit' => 4],
            ['code' => 'CSE108', 'name' => 'Computer Networks', 'credit' => 3],
            ['code' => 'CSE109', 'name' => 'Software Engineering', 'credit' => 3],
            ['code' => 'CSE110', 'name' => 'Python Programming', 'credit' => 3],
        ];

        Course::insert($courses);
    }
}
