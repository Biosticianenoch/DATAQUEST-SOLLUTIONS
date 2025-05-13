import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../contexts/Web3Context';

interface Course {
  creator: string;
  price: string;
  metadataURI: string;
  active: boolean;
  revenueShare: number;
}

export const useCourses = () => {
  const { learningMarketplace, dataQuestToken, account } = useWeb3();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    if (!learningMarketplace) return;
    try {
      const courseCount = await learningMarketplace.nextCourseId();
      const fetchedCourses = [];

      for (let i = 0; i < courseCount; i++) {
        const course = await learningMarketplace.getCourse(i);
        fetchedCourses.push({
          creator: course.creator,
          price: ethers.utils.formatEther(course.price),
          metadataURI: course.metadataURI,
          active: course.active,
          revenueShare: course.revenueShare,
        });
      }

      setCourses(fetchedCourses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    }
  }, [learningMarketplace]);

  const createCourse = useCallback(async (price: string, metadataURI: string, revenueShare: number) => {
    if (!learningMarketplace || !dataQuestToken) return;
    try {
      setLoading(true);
      setError(null);

      // Approve marketplace to spend tokens
      const priceWei = ethers.utils.parseEther(price);
      const approveTx = await dataQuestToken.approve(learningMarketplace.address, priceWei);
      await approveTx.wait();

      // Create course
      const tx = await learningMarketplace.createCourse(priceWei, metadataURI, revenueShare);
      await tx.wait();
      await fetchCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
    } finally {
      setLoading(false);
    }
  }, [learningMarketplace, dataQuestToken, fetchCourses]);

  const purchaseCourse = useCallback(async (courseId: number) => {
    if (!learningMarketplace || !dataQuestToken) return;
    try {
      setLoading(true);
      setError(null);

      const course = await learningMarketplace.getCourse(courseId);
      const priceWei = course.price;

      // Approve marketplace to spend tokens
      const approveTx = await dataQuestToken.approve(learningMarketplace.address, priceWei);
      await approveTx.wait();

      // Purchase course
      const tx = await learningMarketplace.purchaseCourse(courseId);
      await tx.wait();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to purchase course');
    } finally {
      setLoading(false);
    }
  }, [learningMarketplace, dataQuestToken]);

  const updateCourse = useCallback(async (courseId: number, newPrice: string, newMetadataURI: string) => {
    if (!learningMarketplace) return;
    try {
      setLoading(true);
      setError(null);

      const priceWei = ethers.utils.parseEther(newPrice);
      const tx = await learningMarketplace.updateCourse(courseId, priceWei, newMetadataURI);
      await tx.wait();
      await fetchCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course');
    } finally {
      setLoading(false);
    }
  }, [learningMarketplace, fetchCourses]);

  const toggleCourseStatus = useCallback(async (courseId: number) => {
    if (!learningMarketplace) return;
    try {
      setLoading(true);
      setError(null);

      const tx = await learningMarketplace.toggleCourseStatus(courseId);
      await tx.wait();
      await fetchCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle course status');
    } finally {
      setLoading(false);
    }
  }, [learningMarketplace, fetchCourses]);

  const withdrawRevenue = useCallback(async (courseId: number) => {
    if (!learningMarketplace) return;
    try {
      setLoading(true);
      setError(null);

      const tx = await learningMarketplace.withdrawRevenue(courseId);
      await tx.wait();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to withdraw revenue');
    } finally {
      setLoading(false);
    }
  }, [learningMarketplace]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    purchaseCourse,
    updateCourse,
    toggleCourseStatus,
    withdrawRevenue,
  };
}; 