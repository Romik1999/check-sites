<?php

namespace App\Http\Requests\Site;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'url' => 'required|url|unique:sites,url,'.$this->site,
            'active' => 'required|boolean',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
     $response = new \Illuminate\Http\Response(['error' => $validator->errors()->first()], 422);
     throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}
