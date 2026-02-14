import request from 'supertest';
import express, { Request, Response } from 'express';
import {
  getAllMindMaps,
  getMindMapById
} from "../controller/mindmap.controller";
import {
  getAllMindMapsValidation,
  getMindMapByIdValidation
} from "../validator/mindmap.validation";
import * as MindMapService from "../service/mindmap.service";


// Mocking the Service Layer
jest.mock("../service/mindmap.service");

const app = express();
app.use(express.json());

// Router Definition
app.get('/api/v3/mindmaps/all', getAllMindMapsValidation, getAllMindMaps);
app.get('/api/v3/mindmaps/:id', getMindMapByIdValidation, getMindMapById);


describe('GET /api/v3/mindmaps/all (MindMap Validation)', () => {

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('✅ should pass when a valid ownerId is provided', async () => {
    // Given
    const ownerId = "9";
    const mockResponse = [
      {
        _id: "6976000198d7a3427f6c0dcd",
        title: "2nd MindMap try",
        ownerId: "9",
        createdAt: "2026-01-25T11:35:29.187Z",
        updatedAt: "2026-02-14T16:32:11.704Z"
      },
    ];
    (MindMapService.fetchAllMindMaps as jest.Mock).mockResolvedValue(mockResponse);
    // When
    const response = await request(app)
      .get('/api/v3/mindmaps/all')
      .query({ ownerId });
    // Then
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(MindMapService.fetchAllMindMaps).toHaveBeenCalledWith(ownerId);
  });

  it('❌ should fail (400) when ownerId is missing', async () => {
    // When
    const response = await request(app)
      .get('/api/v3/mindmaps/all'); // No query params
    // Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('ownerId is required');
  });

  it('❌ should fail (400) when ownerId is just whitespace', async () => {
    // When
    const response = await request(app)
      .get('/api/v3/mindmaps/all')
      .query({ ownerId: "" });
    // Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('ownerId cannot be empty');
  });

  it('❌ should fail (400) when ownerId is an array instead of a string', async () => {
    // Sending ownerId twice makes it an array: ['9', '10']
    const response = await request(app)
      .get('/api/v3/mindmaps/all')
      .query('ownerId=9&ownerId=10');

    expect(response.status).toBe(400);

    const errorMessages = response.body.errors.map((e: any) => e.msg);
    expect(errorMessages).toContain('ownerId must be a string');
  });

  it('💥 should return 500 if the service layer crashes', async () => {
    // Given
    (MindMapService.fetchAllMindMaps as jest.Mock).mockRejectedValue(new Error('Internal Database Error'));

    // When
    const response = await request(app)
      .get('/api/v3/mindmaps/all')
      .query({ ownerId: '9' });

    // Then
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });

  // Alternate Test Cases, One user should not be able to call the others books from the ownerId

});

describe('GET /api/v3/mindmaps/:id', () => {

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('✅ should return 200 and the mindmap when found', async () => {
    // Given
    const validId = "6976000198d7a3427f6c0dcd";
    const mockMindMap = {
      _id: validId,
      title: "Learning TypeScript",
      ownerId: "9"
    };
    (MindMapService.fetchMindMapById as jest.Mock).mockResolvedValue(mockMindMap);

    // When
    const response = await request(app).get(`/api/v3/mindmaps/${validId}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMindMap);
    expect(MindMapService.fetchMindMapById).toHaveBeenCalledWith(validId);
  });

  it('❌ should fail (400) when id is not following mongoId standards', async () => {
    // When
    const response = await request(app)
      .get('/api/v3/mindmaps/invalid-id');
    // Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe(
      "Id must be a valid mongo id, 24 character hex string, 12 byte Uint8Array, or an integer"
    );
  });

  it('🔍 should return 404 when the mindmap does not exist', async () => {
      // Given
      const nonExistentId = "6976000198d7a3427f6c0dcd";
      (MindMapService.fetchMindMapById as jest.Mock).mockResolvedValue(null);

      // When
      const response = await request(app).get(`/api/v3/mindmaps/${nonExistentId}`);

      // Then
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('MindMap not found');
  });

  it('💥 should return 500 if the service layer crashes', async () => {
    // Given
    (MindMapService.fetchMindMapById as jest.Mock).mockRejectedValue(new Error('Internal Database Error'));

    // When
    const response = await request(app).get('/api/v3/mindmaps/6976000198d7a3427f6c0dcd');

    // Then
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});