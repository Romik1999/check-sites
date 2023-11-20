<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Site::class, column: 'site_id')->constrained()->cascadeOnDelete();
            $table->text('response_code');
            $table->json('response_header')->nullable();
            $table->json('response_body')->nullable();
            $table->timestamp('created_at');

            // Индексация
            $table->index('created_at');
            $table->index('site_id');
            $table->index('response_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
