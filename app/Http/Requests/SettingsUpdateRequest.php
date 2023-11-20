<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingsUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'check_enabled' => 'required|boolean',
            'telegram_enabled' => 'required|boolean',
            'telegram_token' => 'nullable',
            'telegram_chat_id' => 'nullable',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $response = new \Illuminate\Http\Response(['error' => $validator->errors()->first()], 422);
        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}
