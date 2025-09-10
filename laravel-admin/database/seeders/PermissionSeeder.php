<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::insert([
            ['name' => 'iew_users'],
            ['name' => 'dit_users'],
            ['name' => 'iew_roles'],
            ['name' => 'dit_roles'],
            ['name' => 'iew_products'],
            ['name' => 'dit_products'],
            ['name' => 'iew_orders'],
            ['name' => 'dit_orders'],
        ]);
    }
}
