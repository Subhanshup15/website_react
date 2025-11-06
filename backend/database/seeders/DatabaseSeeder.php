<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
   public function run(): void
{
    // $user = \App\Models\User::factory()->create([
    //     'name' => 'Admin User',
    //     'email' => 'admin@example.com',
    // ]);

    // $user->assignRole('admin');
    // $this->call([
    //     CourseSeeder::class,
    // ]);
    $this->call([
        // CourseSeeder::class,
        TeacherSeeder::class,
    ]);
}

}
